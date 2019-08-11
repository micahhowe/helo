SELECT posts.user_id, post_content, username, post_image, post_title FROM posts
JOIN user_info
ON posts.user_id = user_info.user_id
WHERE post_title LIKE $1;