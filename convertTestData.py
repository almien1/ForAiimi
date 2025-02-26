import csv

# Saved as UTF-8, but there's nothing non-ascii in there
with open("InterviewTestData.csv") as f:
    reader = csv.reader(f)
    first = True
    id = 0
    indent = " " * 16
    for row in reader:
        if first:
            fields = row
            first = False
        else:
            id += 1
            obj = {}
            for field in fields:
                value = row.pop(0)
                obj[field] = value
            print(indent + "new PersonModel {Id = %d, %s}," % (
                id,
                ", ".join("%s = \"%s\"" % (k,v) for k,v in obj.items())))
