-- Matches the hash and the email
SELECT * FROM user_info u
JOIN credentials c ON c.user_id = u.user_id
WHERE email = $1;