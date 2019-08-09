INSERT INTO user_info(username, email)
VALUES(${username}, ${email})
RETURNING *;