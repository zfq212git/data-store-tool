# data-store-tool
node + mysql + some encoding to save data


1. The user interface page was constructed in a single way adequate to ensure easy testing.

2. The back-end service is on node.

3. The database is mysql.

4. The encoding/decoding uses crypto module.

5. The tricky parts learnt,
    (1) ajax needs to be used in order to update part of the web page without updating all or redirecting to a new page.  I forgot this.
    (2) How to do the error-handling well along the workflow was a little challenging, which included handling async callbacks and database errors...
    (3) the encoding/decoding code also has some tricky parameters that I don't understand.  The existing code came from copy/paste and trial/error labor work :).   
    
6. The next step is to deploy to cloud... 
