# combination-cli
Generate combinations

Configuration options
1. baseURL
2. publisherID
3. noOfPlaces
e.g. baseURL = "http://abcd.efgh/c/"
publisherID = "ABCD"
noOfPlaces = 6
Example of concatenated url
http://abcd.efgh/c/ABCD-_ _ _ _ _ _

baseURL + (publisherID-uniqueCode)

http://abcd.efgh/c/ABCD-000000
http://abcd.efgh/c/ABCD-000001
http://abcd.efgh/c/ABCD-000002
http://abcd.efgh/c/ABCD-000003
http://abcd.efgh/c/ABCD-000004
http://abcd.efgh/c/ABCD-000005
http://abcd.efgh/c/ABCD-000006
.
.
.
