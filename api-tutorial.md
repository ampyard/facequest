---
layout: api_docs
title: API Tutorial
permalink: /api-tutorial
---

## FaceQuest® API Tutorial:
<br/>

FaceQuest® is facial recognition software as a service. That also provides an API (Application Programming Interface) for interacting with your client application easily. 

You do not need jazzy infra or AI coding skills to recognize faces in your software. FaceQuest® enables you to concentrate on building your own software, without additional investment and maintenance for high end infrastructure.

FaceQuest® does not care what programming language you use to code. As long as you can call HTTP(s) API end-points from your code, you could recognize faces from Java, JavaScript, Ruby, Scala.

[For more details visit our API Docs here](https://facequest.io/api-docs)

If you want to integrate an API backend using Node.js and Java, we have created a sample client in github repository for Node.js and Java.

[Node.js Client](https://github.com/facequest/sample-nodejs-client)

[Java Client](https://github.com/facequest/sample-spring-boot-client)


We need some basic credentials for authentication of our API’s.


### Authentication:

<br/>
<b>Email:</b> We require an email registered with Facequest.io

<b>Secret:</b> Facequest API secret key that you have set from Facequest web UI

<b>Constant-Authorization-Token:</b> A constant “bearer” required for all requests via API.

To call API endpoints we have used Postman or you can use a terminal or command prompt and make a curl request as per examples given in the api documentation page.


<br/>

### Face Verifications through API’s:
<br/>
APIs for FaceQuest®'s 1:1 Face verification.

Here step by step guide is given for how to do face verification, get verification logs, track verification results through verification ID, fetch photo upload URL and file path of the photo to be verified through facequest API.
To create a face verification request through API, First we need to have the file path of the photo to be uploaded for face verification, one is reference face file path and other is photo to be verified file path. We use this file path in the request we have to post from our terminal to facequest API endpoint.

We are using Postman to make all requests to the API endpoint.

<b>How to make cURL requests using Postman?</b>

1. 1) Open POSTMAN.
2. 2) Click on the <b>"import"</b> tab on the upper left side.
3. 3) Select the Raw Text option and paste your cURL command.
4. 4) Hit import and you will have the command in your Postman builder.
5. 5) Click Send to post the command.


<br/>

#### Step 1:

#### Fetch Upload URLs: {#fetch-URL}

<br/>

Returns pre-signed URLs to upload reference photo and the photo to be verified.
For the authentication we use <b>email address, secret token and constant authorization token “bearer”</b>.

*Here is the sample cURL request to get upload URLs.*

```
curl -X GET 'https://verifyapi.facequest.io/api/v1/verification/uploadurl' \
-H 'secret: secret_that_i_set_in_facequest_web_ui' \
-H 'email: email_id_registered_with_facequest' \
-H 'accept: application/json' \
-H 'authorizationtoken: bearer' \
--compressed
```

<br/>

<img class="img-fluid" src="./img/tutorial/fetch-URL.gif" alt="fetch-url">
*Example: Fetch upload URL*


In this example we make curl requests through a Postman client that returns us a reference face *“upload URL”* and  *“file path”* and photo to be verified *“upload URL”* and  *“file path”*. 

This url and file path are used to create face verification request through API. We need to pass the file path that is given in this response when creating a face verification request.


<br/>

#### Step 2:

#### How To Upload ReferencePhoto and Photo To Be Verified? {#upload-photos}

<br/>

To upload photos on which we have to do face verification, first we need to upload it via our API endpoint. We already have an upload URL of photos that’s fetched from the above API endpoint response like this example.
<br/>

```
{
    "data": {
        "referencePhoto": {
            "uploadUrl": "https://facequest-verification-faces.s3.amazonaws.com/267c04d0-e9cf-431f-b614-e878cc781162%40gmail_com/ec5000c4-88a6-4d73-83b2-6fb97a765f15?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARNEJIG26A2OHGS6C%2F20210125%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210125T105249Z&X-Amz-Expires=1800&X-Amz-Signature=f811d061c4e763f84c57d30d19f34fc0b6dbe3b92ca2155285262d4d5784a4ea&X-Amz-SignedHeaders=host",
            "filePath": "267c04d0-e9cf-431f-b614-e878cc781162@gmail_com/ec5000c4-18a6-4d73-83b2-6fb97a765f15"
        },
        "photoToBeVerified": {
            "uploadUrl": "https://facequest-verification-faces.s3.amazonaws.com/267c04d0-e9cf-431f-b614-e878cc781162%40gmail_com/0aa76efd-1475-4790-8d8d-232a875ceca8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARNEJIG26A2OHGS6C%2F20210125%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210125T105249Z&X-Amz-Expires=1800&X-Amz-Signature=4107f113e268221a614572fea6e3b62acc3881e509fd64ef6ae75cd14199f2a5&X-Amz-SignedHeaders=host",
            "filePath": "267c04d0-e9cf-431f-b614-e878cc781162@gmail_com/0aa76efd-1475-4790-8d8d-232a875ceca1"
        }
    },
    "errorMessage": ""
}

```

*Example: Fetch URL API Response*

Here we have the upload URL and file path of reference photo and photo to be verified. This url is useful for uploading reference photo and photo to be verified.

<br/>
<img class="img-fluid" src="./img/tutorial/upload-images-server.gif" alt="upload-images">

*Example: Upload Reference Photo & Photo to be Verified*

<br/>

In the above given example we have to upload both reference photo and photo to be verified via PUT request through postman. Just copy the reference photo upload URL, create a PUT request and paste the URL that we copied earlier. Also, we have to send an image file(Reference Photo or Photo to be verified) with this request. 

1. 1) Go to the Body in Postman, then click form-data.
2. 2) Then you have to see Key and Value columns there.
3. 3) In the key there is an option to select “text or File”. Give any name you like as a key.
4. 4) In the value column you see the “select files” option. Here you have to select a reference photo from your computer’s local storage.
5. 5) Then press the “send” button. You will see the status message “200 OK”, which means that your photo is successfully uploaded.

<br/>
Repeat the same process for “photo to be verified”. Just copy “Photo to be verified” URL and select file then create a new PUT request with it to upload the photo.


<br/>

#### Step 3:
#### Create Verification Request: {#create-verification}

<br/>
Creates a new verification request with/without using the stored reference photo from folders. The progress of this request can be tracked asynchronously.

We just have to pass a reference photo file path and photo to be verified file path to create this request. We can copy file path response from the "Fetch upload URL" endpoint.

*Sample cURL request:*

```
curl -X POST 'https://verifyapi.facequest.io/api/v1/verification' \
-H 'secret: secret_that_i_set_in_facequest_web_ui' \
-H 'email: email_id_registered_with_facequest' \
-H 'accept: application/json' \
-H 'authorizationtoken: bearer' \
--compressed
```

<br/>

<b>Payload to be passed with the request:</b> We have to pass the payload given below with the value of tile, notes, referencePhotoFilePath, photoToBeVerifiedFilePath, and useStoredPhotoForReference. 

```
{
  "title": "verify photo sample",
  "notes": "sample notes",
  "referencePhotoFilePath": "String",
  "photoToBeVerifiedFilePath": "String",
  "useStoredPhotoForReference": "false"
}
```

If you want to use a stored photo for reference then you just need to pass the true value in <b>*"useStoredPhotoForReference"*</b> otherwise pass false.
See this example given below to create a verification request from API. This returns the <b>*“Verification Request ID”*</b> back.


<br/>
<img class="img-fluid" src="./img/tutorial/verification-request.gif" alt="verification-request">

*Example: Create verification request*

<br/>

#### Step 4:
#### Track Verification Request: {#track-verification}

<br/>
Track any verification request using verificationRequestId, returned upon invoking POST request at URL /api/v1/verification.

For the verification we just need to pass Verification Request ID to the api endpoint that we copied from the “create verification request” response.

*Sample cURL request:*

```
curl -X GET 'https://verifyapi.facequest.io/api/v1/verification/{verificationRequestId}' \
-H 'secret: secret_that_i_set_in_facequest_web_ui' \
-H 'email: email_id_registered_with_facequest' \
-H 'accept: application/json' \
-H 'authorizationtoken: bearer' \
--compressed
```

<br/>
<img class="img-fluid" src="./img/tutorial/verification-tracking.gif" alt="track-verification">

*Example: Track verification request*

<br/>
This gives us the verification result back with matched percentage, title and notes.


<br/>

#### Step 5:
#### Fetch Verification Logs: {#verification-log}

<br/>
To fetch face verification logs that you have done earlier, you only need to get data from the API endpoint as per given example.

Just paste this command in the terminal or make a curl request using Postman, that gives us all verification logs data in JSON format.

*Sample cURL request:*

```
curl -X GET 'https://verifyapi.facequest.io/api/v1/verification/logs' \
-H 'secret: secret_that_i_set_in_facequest_web_ui' \
-H 'email: email_id_registered_with_facequest' \
-H 'accept: application/json' \
-H 'authorizationtoken: bearer' \
-compressed
```

<br/>
You just have to add your Facequest login email Id and Secret token that you have set from the Facequest UI dashboard.


<br/>
<img class="img-fluid" src="./img/tutorial/verification-logs.gif" alt="verification-logs">

*Example: Fetch verification logs*

<br/>


In this curl request we passed email, secret and constant authorization token “bearer” in our case. In the example given below we make GET request for all verification logs through Postman.

If there is no data to show it will return an empty object back with status code 200.
In case of unauthorized request it returns an <b>“unauthorized”</b> error message with status code 401.


<br/>

#### Create A Folder Using API: {#create-folders}

<br/>
To create a folder with the given name where the reference photos can be uploaded. Maximum limit of reference photos per folder is 100, we use this API given in example.

For the authorization we just need to have Email registered with Facequest.io, Secret token and Authorization token <b>“bearer”</b>.

*sample cURL request:*
```
curl -X POST 'https://app.facequest.io/api/v1/folders/{name}' \
-H 'secret: secret_that_i_set_in_facequest_web_ui' \
-H 'email: email_id_registered_with_facequest' \
-H 'accept: application/json' \
-H 'authorizationtoken: bearer' \
--compressed
```

In the above Post request, you have to pass the folder name at this api endpoint “https://app.facequest.io/api/v1/folders/{name}”. This creates a new folder with the given name. See this example given here, how to create a new folder through API.

<br/>
<img class="img-fluid" src="./img/tutorial/create-new-folder.gif" alt="verification-logs">

*Example: Create a new folder*

<br/>

After successfully creating the folder it gives us the following response back.

```
{
    "page": {
        "totalElements": 1
    },
    "_embedded": [
        {
            "id": "b55b2b9d-5b66-49ac-babc-3382d48b570c",
            "user_id": "267c04d0-e9cf-431f-b614-e878cc781162",
            "name": "sample",
            "parent_folder": null,
            "created": "2021-01-20T08:11:22.586Z",
            "last_updated": "2021-01-20T08:11:22.586Z"
        }
    ]
}
```

<br/>

#### Retrieve All Folders: {#get-folders}

<br/>
To retrieve all folders that you have created earlier, use this API endpoint that gives a list of all folders as a JSON response.

```
curl -X GET 'https://app.facequest.io/api/v1/folders' \
-H 'secret: secret_that_i_set_in_facequest_web_ui' \
-H 'email: email_id_registered_with_facequest' \
-H 'accept: application/json' \
-H 'authorizationtoken: bearer' \
--compressed
```

<b>Note: special characters like “/” or “\” (slash) are not allowed to enter in folder names. </b>
<b>For example: “folder-name/example” or “folder-name\example”.</b>

This gives us all folders that you have created as a JSON response.

```
{
    "page": {
        "totalElements": 2
    },
    "_embedded": [
        {
            "id": "f66d18d3-18cc-4801-a75b-9a425bebc12",
            "user_id": "267c04d0-e9cf-431f-b614-e878cc681462",
            "name": "sample",
            "parent_folder": null,
            "created": "2021-01-20T08:09:43.468Z",
            "last_updated": "2021-01-20T08:09:43.468Z"
        },
        {
            "id": "b55b2b9d-5b66-49ac-babc-3382d48b5112",
            "user_id": "267c04d0-e9cf-431f-b614-e878cc721162",
            "name": "sample2",
            "parent_folder": null,
            "created": "2021-01-20T08:11:22.586Z",
            "last_updated": "2021-01-20T08:11:22.586Z"
        }
    ]
}
```

<br/>

#### Delete Folders: {#delete-folders}

<br/>

If you want to delete any folder by using folder ID. Every folder has UUID.

*Sample cURL request:*

```
curl -X DELETE 'https://app.facequest.io/api/v1/folders/{folderId}' \
-H 'secret: secret_that_i_set_in_facequest_web_ui' \
-H 'email: email_id_registered_with_facequest' \
-H 'accept: application/json' \
-H 'authorizationtoken: bearer' \
--compressed
```

After successful request you get “success” message like this:
```
{
  "id": "db4c9444-3a7e-438e-ad7d-e486badff7df",
  "status": "SUCCESS"
}
```

<br/>

#### Create a Reference Photo: {#create-photo}

<br/>

Creates a reference photo with the given name within the given folder.
You have to pass Reference Photo name, Folder ID and File path to create reference photo in the particular folder. Just make a request with a cURL command in your terminal. 

<b>Note:</b> Make sure that you are in the same directory from where you selected image file.

After successful request it returns photo ID with “Success” message.

<br/>
<img class="img-fluid" src="./img/tutorial/create-reference-photo.png" alt="verification-logs">

*Example: Create a Reference Photo*

<br/>


#### Retrieve Reference Photo: {#get-photo}

<br/>
Retrieve Reference photo from given folder with folderId. You need to pass the folderId that you have created earlier with this request that returns all image data as a response.


*Sample cURL request:*

```
curl -X GET \
https://app.facequest.io/api/v1/reference-faces/folder/{folderId} \
-H 'secret: secret_that_i_set_in_facequest_web_ui' \
-H 'email: email_id_registered_with_facequest' \
-H 'accept: application/json' \
-H 'authorizationtoken: bearer' \
--compressed
```

<br/>
<img class="img-fluid" src="./img/tutorial/get-photos.gif" alt="get-photos">

*Example: Retrieve a Reference Photo*

<br/>

*Sample response:*

```
{
  "page": {
    "totalElements": 1
  },
  "_embedded": [
    {
      "id": "5f42d765-c26c-436a-92a5-36803412125a",
      "name": "John Doe",
      "owned_by_user": "1df0a952-3796-11ea-aec2-2e728ce34125",
      "last_detected_time": "2020-12-08T08:55:19.847Z",
      "picture_url": "https://mk6kd5pdmpkiyr.s3.amazonaws.com/reference/8adare24-f3b8-4a2b-bd98-f0cb19245754.jpeg?AWSAccessKeyId=AKIARNEJIER6A2OHGS6C&Expires=1607675535&Signature=VaUw946p15htqh2wy8IcOqQBQDg%3D",
      "folder_id": "123e4567-e89b-12d3-a456-426655440000",
      "face_encoding": null
    }
  ]
}
```

<br/>

#### Replace Reference Photo With Another Photo: {#replace-photo}

<br/>

If you want to replace a reference photo then use this api endpoint to replace images by passing image id with api request, email, secret and photo to be replaced. 

If you send a request from the terminal then make sure that you are in the same directory where the image exists, otherwise it gives an error & image contains at least one face.

```
curl -X PUT \
https://app.facequest.io/api/v1/reference-faces/replace-photo/{photoId} \
-H 'secret: secret_that_i_set_in_facequest_web_ui' \
-H 'email: email_id_registered_with_facequest' \
-H 'accept: application/json' \
-H 'authorizationtoken: bearer' \
-H 'content-type: multipart/form-data' \
-F file=@upload.jpg
```


<br/>
<img class="img-fluid" src="./img/tutorial/replace-photo.gif" alt="replace-photos">

*Example: Replace Reference Photo*

<br/>

The response returns a replaced image ID with a success message like this.

```
{
  "id": "cdef9444-3a7e-438e-ad7d-e486badff7df",
  "status": "SUCCESS"
}
```