use employees;

insert into department (name) values ('HR'), ('TECH');

insert into role (title, salary, department_id) values 
('HR Rep', 100000, 1), 
('Techonologist', 90000, 2), 
('Employee Relations Manager', 105000, 1),
('Recruiter', 95000, 1), 
('Web Developer', 120000, 2), 
('Application Analyst', 98000, 2), 
('User Interface Designer', 112000, 2);

insert into employee  (first_name, last_name, role_id, manager_id) values ("John", "Doe", 1, null);

insert into employee  (first_name, last_name, role_id, manager_id) values ("Jane", "Doe", 1, 1);
