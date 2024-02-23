USE Cohorts;

CREATE TABLE Users(full_name VARCHAR(200), email VARCHAR(200), cohort_no INT, password VARCHAR(200))

ALTER TABLE Users
ADD id VARCHAR(200) NOT NULL