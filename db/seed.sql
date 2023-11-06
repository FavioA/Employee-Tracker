insert into department (name) values ('HR'), ('TECH');

insert into role (title, salary, department_id) values ('HR Rep', 100000, 1), ('Techonologist', 90000, 2);

insert into employee  (first_name, last_name, role_id, manager_id) values ("John", "Doe", 1, null);

insert into employee  (first_name, last_name, role_id, manager_id) values ("Jane", "Doe", 1, 1);
