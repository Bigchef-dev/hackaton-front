-- Grant remote access to root user for all hosts
CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY 'root_password';
ALTER USER 'root'@'%' IDENTIFIED BY 'root_password';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
