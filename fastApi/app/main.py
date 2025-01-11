from fastapi import FastAPI, HTTPException
from utils import json_to_dict_list
import os
from typing import Optional
import os
from pydantic import BaseModel, Field
from datetime import date
class Student(BaseModel):
    student_id: int
    first_name: str
    last_name: str
    date_of_birth: date
    email: str
    phone_number: str
    address: str
    enrollment_year: int = Field(..., ge=1900) 
    major: str
    course: int = Field(..., ge=1) 
    special_notes: Optional[str] = None
# Получаем путь к директории текущего скрипта
script_dir = os.path.dirname(os.path.abspath(__file__))

# Переходим на уровень выше
parent_dir = os.path.dirname(script_dir)

# Получаем путь к JSON
path_to_json = os.path.join(parent_dir, 'students.json')
app = FastAPI()
@app.get("/")
def home_page():
    return {"message": "Привет, Хабр!"}

@app.get("/students")
def get_all_students_course(course: Optional[int]=None ):
    students = json_to_dict_list(path_to_json)
    if course is None:
        return students
    else:
        return_list = []
        for student in students:
            if student["course"] < course:
                return_list.append(student)
        return return_list


@app.post("/students/", response_model=Student)  #response_model указывает на то как будет выглядеть ответ
async def create_student(student: Student):
    students = get_all_students_course()
    if any(s["student_id"] == student.student_id for s in students):
        raise HTTPException(status_code=409, detail="Student ID already exists")
    return student
