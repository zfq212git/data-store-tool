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



===================================

Below notes are specifically for deploy the code to AWS

1. The package is in the folder "aws deploy package except test1-html".  So, as required, the file test1.html should not be in the package deployed to aws.  It is only as testing client.

2. As noted in AWS, when you compress to generate the ZIP for deployment, do NOT compressed the folder.  Instead, select all the files together and compress them !

3. I chose "build up a web app" in AWS to help me build up this small app (it actually set up Elastic beanstalk, EC2, mysql in the backend).  It claimed to cost only 6 min.  It actually took me about 6 hours.  Here are the tricky things for me for anybody to learn, :)

    (1) when following the steps to build up the web app in AWS, explicitly choose which region you want to use.  AWS seems to have a "AWS standard region" as default but it actually did not work.
    
    (2) if ngnix is chosed (it is defaultly chosen), be sure in your server.js, add "process.env.PORT" as option for listening channel.  So the code may look like "process.env.PORT || 8080", otherwise you would have trouble, as most of us when debugging locally we only choose one number like 8080.  Also, in my test1.html, I had to remove 8080 and only kept the end point address to ensure the calling succeed.  (http://thordog.com/2013/05/20/502-bad-gateway-on-nginx-using-nodejs-on-elastic-beanstalk/)
    
    (3) When necessary, go to check the inbound/outbound setting in security group (which exist in both EC2 and database (if used)).  It may cause some connection in some cases.
    
    (4) AWS defaultly chose a older version of node for me, I don't know why.  I changed it to the latest version in the setting.  
    
    (5) I use mysql as the database for this app.  One tricky thing is that I need to remove the :3306 from the setting for "host" parameter for database connection, to make it work.  This is different from my local debugging, when the 3306 needs to be explicitly set.  I found this trick from the aws log that always has database error reported as :3306 :3306, so I thought perhaps aws-mysql defaultly set that and I should not set it in my code again.  It worked !
