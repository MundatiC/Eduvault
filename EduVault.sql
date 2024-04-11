CREATE TABLE [Students] (
  [id] VARCHAR(50) PRIMARY KEY UNIQUE,
  [first_name] VARCHAR(50),
  [last_name] VARCHAR(50),
  [email] VARCHAR(100) UNIQUE,
  [gender] VARCHAR(10),
  [date_of_birth] DATE
)
GO

CREATE TABLE [Qualtrics] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR,
  [survey_name] VARCHAR,
  [survey_response] NVARCHAR(MAX),
  [survey_date] DATE
)
GO

CREATE TABLE [PERC] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR,
  [perc_score] DECIMAL,
  [perc_date] DATE
)
GO

CREATE TABLE [SPIGRIT] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR,
  [spigrit_score] DECIMAL,
  [spigrit_date] DATE
)
GO

CREATE TABLE [Tally] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR,
  [form_name] VARCHAR,
  [form_response] NVARCHAR(MAX),
  [form_date] DATE
)
GO

CREATE TABLE [Assessments] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR,
  [assessment_type] VARCHAR,
  [assessment_score] DECIMAL,
  [assessment_date] DATE
)
GO

CREATE TABLE [Attendance] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR,
  [attendance_date] DATE,
  [attendance_status] BIT
)
GO

CREATE TABLE [Exams] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR,
  [exam_number] INT,
  [exam_score] DECIMAL,
  [exam_date] DATE
)
GO

CREATE TABLE [Quizzes] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR,
  [quiz_number] INT,
  [quiz_score] DECIMAL,
  [quiz_date] DATE
)
GO

CREATE TABLE [GeneralSurvey] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR,
  [survey_responses] NVARCHAR(MAX),
  [survey_date] DATE
)
GO

CREATE TABLE [ControlGroup] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR
)
GO

CREATE TABLE [Lottery] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR,
  [lottery_date] DATE,
  [lottery_result] BIT
)
GO

CREATE TABLE [Sponsorship] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR,
  [sponsor_name] VARCHAR,
  [sponsor_start_date] DATE,
  [sponsor_end_date] DATE
)
GO

CREATE TABLE [Graduates] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR,
  [graduation_date] DATE
)
GO

CREATE TABLE [Timestamps] (
  [id] uniqueidentifier PRIMARY KEY,
  [student_id] VARCHAR,
  [created_at] DATETIME,
  [updated_at] DATETIME2
)
GO

ALTER TABLE [Qualtrics] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO

ALTER TABLE [PERC] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO

ALTER TABLE [SPIGRIT] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO

ALTER TABLE [Tally] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO

ALTER TABLE [Assessments] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO

ALTER TABLE [Attendance] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO

ALTER TABLE [Exams] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO

ALTER TABLE [Quizzes] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO

ALTER TABLE [GeneralSurvey] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO

ALTER TABLE [ControlGroup] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO

ALTER TABLE [Lottery] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO

ALTER TABLE [Sponsorship] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO

ALTER TABLE [Graduates] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO

ALTER TABLE [Timestamps] ADD FOREIGN KEY ([student_id]) REFERENCES [Students] ([id])
GO
