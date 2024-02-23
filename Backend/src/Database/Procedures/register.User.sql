CREATE OR ALTER PROCEDURE registerUser(@id VARCHAR(200), @full_name  VARCHAR(200), @email VARCHAR(200), @cohort_no INT, @password VARCHAR(200))
AS
BEGIN
    INSERT INTO Users(id, full_name, email, cohort_no, password)
    VALUES(@id, @full_name, @email, @cohort_no, @password)
END;
