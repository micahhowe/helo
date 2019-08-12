INSERT INTO posts (user_id, post_content, post_image, post_title)
VALUES ( $1, $2, $3, $4);
SELECT * FROM posts;