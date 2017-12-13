# combination-cli
Generate combinations    
    
Configuration options    
1. baseURL    
2. publisherID    
3. noOfPlaces    
4. values = [0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z]    
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

### Usage
#### Get me first 1000    
combination 1000    

#### Get me from 100 - 500    
combination 100,500    

#### Get me from 3000 - 5000    
combination 3000,5000    

### Edge cases    
1. e.g. for 2 digit, with values between 0-9; maximum combinations are 100, i.e. 0 to 99. If user inputs don't fall in that range, show a proper message and exit.    
