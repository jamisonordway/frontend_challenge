#!/bin/bash
set -e

mongo <<EOF
use challenge

db.users.drop()
db.createCollection("users")

db.users.insertMany([
	// MongoDB adds the _id field with an ObjectId if _id is not present
	{ "id": 1, "full_name": "User 1", "email": "user1@email.com", "survey_date": "2017-04-24 00:15:52" },
	{ "id": 2, "full_name": "User 2", "email": "user2@email.com", "survey_date": "2017-08-19 19:35:42" },
	{ "id": 3, "full_name": "User 3", "email": "user3@email.com", "survey_date": "2015-10-28 09:34:39" },
	{ "id": 4, "full_name": "User 4", "email": "user4@email.com", "survey_date": "2016-03-27 14:30:16" },
	{ "id": 5, "full_name": "User 5", "email": "user5@email.com", "survey_date": "2016-09-11 18:38:50" }
]);

EOF
