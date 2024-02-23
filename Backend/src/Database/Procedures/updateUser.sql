CREATE OR ALTER PROCEDURE updateUser(@id VARCHAR(200), @full_name  VARCHAR(200), @email VARCHAR(200), @cohort_no INT, @password VARCHAR(200))
AS
BEGIN
    UPDATE Users SET
    full_name = @full_name,
    email = @email,
    cohort_no = @cohort_no,
    password = @password
    WHERE id = @id
END