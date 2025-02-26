/* 
    Vue.js application to work with index.html
*/
new Vue({
    el: '#app',
    data: {
        search: '',
        previousSearch: '',
        message: '',
        loading: false,
        error: null,
        pendingSearches: false,
        directory: [],
        newUserFormVisible: false,
        newUserData: {},
        newUserValid: false,
        newUserValidationError: 'Enter new user details'
    },
    methods: {
        toggleNewUserForm: function () {
            this.newUserFormVisible = !this.newUserFormVisible;
        },
        onSearchTextChanged: function () {
            //
            // "After a user types 2 characters, matches are suggested" (but then why have a "Go" button?)
            //
            // It looks like there are two levels of search, with one being a list of names, and perhaps
            // "Go" or [Enter] copies that list to the block of cards?
            //
            // For now, we'll just display one set of search results pending a requirements meeting.
            //
            if (this.previousSearch.length < 2 && this.search.length >= 2) {
                this.updateSearch();
            }
            this.previousSearch = this.search;
        },
        updateSearch: function () {
            if (this.loading) {
                // An HTTP request is already in progress - put a reminder to check again later
                this.pendingSearches = true;
            }
            else if (this.search == "") {
                // No search -> no results
                this.directory = [];
                this.pendingSearches = false;
                this.error = null;
            }
            else {
                // Search via the REST API
                this.loading = true;
                this.error = null;
                this.pendingSearches = false;
                // In the requirements they show the search box empty but results visible - so should we 
                // clear the search box here?  That would probably not be what the user wanted?
                fetch(`api/People?Search=${encodeURI(this.search)}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Can\'t access search API');
                        }
                        return response.json();
                    })
                    .then(data => {
                        this.directory = data;
                        this.loading = false;

                        // In case any additional characters were typed during the http request:
                        if (this.pendingSearches) {
                            this.updateSearch();
                        }
                    })
                    .catch(error => {
                        this.error = error;
                        this.loading = false;
                    });
            }
        },
        createNewUser: function () {
            // POST request sends the fields as JSON, but without an ID
            fetch("api/People", {
                method: "POST",
                body: JSON.stringify(this.newUserData),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Couldn\'t create new user');
                    }
                    return response.json();
                })
                .then(
                    // The response did contain the new user, but it's probably
                    // more reliable to do a search for it, so that we have just
                    // one method for downloading data:
                    this.onNewUserCreated()
                ).catch(error => {
                    this.error = error;
                });
        },
        onNewUserCreated: function () {
            var newUserName = this.newUserData.lastName;
            this.newUserFormVisible = false;
            this.newUserData = {};

            // Search for the new user, since someone would probably want to check their new data:
            this.search = newUserName;
            this.updateSearch();
        },
        phoneEntry: function () {
            // Restrict phone numbers to numbers, spaces, dashes (for american style) and the plus character (but see below):
            const phoneRegexExclude = /[^0-9-+ ]/g;
            this.newUserData.phone = this.newUserData.phone.replace(phoneRegexExclude, "");

            // Then disallow the country-code identifier (like +44) anywhere except at the beginning
            const phoneRegexPlus = /(?<=.)[+]/g; // (zero-width assertion of anything being to the left => not the first character)
            this.newUserData.phone = this.newUserData.phone.replace(phoneRegexPlus, "");

            // Note: there could be some additional validations per https://en.wikipedia.org/wiki/E.164
            // for example length could be <=15 but that's not an absolute ("ITU-T recommends that the maximum 
            // number of digits for the international geographic, global services, network and groups of 
            // countries applications should be 15"), but they might even be using a private phone system,
            // and of course spaces, dashes, etc. wouldn't count towards the length of the actual number.
        },
        validEmail: function (email) {
            //
            // Email validation isn't possible without actually contacting the user's mail server,
            // (as the local part validity could be whatever the server says it is), but the spec
            // is in https://datatracker.ietf.org/doc/html/rfc5322 section 3.4.
            //
            // There are some regular expressions which claim to match the domain part, but they
            // can get extremely complex with comments, IPv6 addresses, etc. so for simplicity
            // we'll just look for an @ with *something* in each local/domain portion!
            //
            // We could also check for domains such as example.com, mailinator.com etc. that are
            // either guaranteed to be invalid, or are clearly disposable, or are something like
            // a .onion address (do we even know if this system is on the regular internet?)
            // 
            const emailRegex = /^.+@.+$/;
            return emailRegex.test(email);
        },
        validTextField: function (field) {
            // Fields don't have to be present, so only check data which exists
            return field != undefined && field != null;
        },
        validateNewUserForm: function () {
            // First and last names are needed for the server-side API
            if (!this.validTextField(this.newUserData.firstName) || this.newUserData.firstName == "") {
                this.newUserValid = false;
                this.newUserValidationError = "First name required";
            }
            else if (!this.validTextField(this.newUserData.lastName) || this.newUserData.lastName == "") {
                this.newUserValid = false;
                this.newUserValidationError = "Last name required"; // https://history.stackexchange.com/questions/54917
            }
            else if (this.validTextField(this.newUserData.email) && (!this.validEmail(this.newUserData.email))) {
                // Note this is client-side only, so doesn't actually stop invalid emails if the user ignores
                // or changes this code - but since the requirements doc mentions validation in the job spec
                // for the front-end developer, that implies an expectation that it is done client-side?
                this.newUserValid = false;
                this.newUserValidationError = "Invalid email address";
            }
            else {
                this.newUserValid = true;
                this.newUserValidationError = '';
            }
        },
        clearError: function () {
            this.error = null;
        }
    },
    mounted: function () {
        // Options to test various examples from the requirements document
        if (false) {
            this.search = "Ph";
            this.updateSearch();
        }
        if (false) {
            this.newUserFormVisible = true;
            this.newUserData = {
                firstName: "Oliver",
                lastName: "White",
                jobTitle: "TODO: Hire this person",
                phone: "+44 0000 0000000",
                email: "owhite@example.com" /* Note: test.com is a real domain!!! example.com is the RFC-protected one! */
            };
        }
        if (false) {
            this.error = "This is a sample error message";
        }
    }
});
