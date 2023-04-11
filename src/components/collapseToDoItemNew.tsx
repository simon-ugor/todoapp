import React from 'react'
import { useState } from 'react';
import { toDoSchema } from '@/zodSchemas/zodSchemas';
import { useAppContext } from '@/context/store';
import { useFormik } from 'formik';
import { submitToDo } from '@/api/api';

interface Props {
    hidden: string
    referenceId: string
    hide: () => void
}

const CollapseToDoItemNew = ({ hidden, hide, referenceId }: Props) => {

    const { allItems, setItems, setAlert } = useAppContext()

    const [collapse, setCollapse] = useState("collapse collapse-open collapse-arrow border border-base-300 bg-base-100 rounded-box w-10/12 mt-4");

    const submitApi = async (name: string, desc: string, deadline: string, reference: string) => {
        const dataItem = await submitToDo(name, desc, deadline, reference);
        hide();
        formik.resetForm();
        setItems([...allItems, dataItem]);
    }

    const discardClick = () => {
        formik.resetForm()
        hide();
    }

    const formik = useFormik({
        initialValues: { nameOfToDo: "", descOfToDo: "", deadlineDay: "", deadlineMonth: "", deadlineYear: "", deadlineHours: "", deadlineMinutes: "" },
        onSubmit: values => {
            let deadlineParsed = values.deadlineYear + "-" + values.deadlineMonth + "-" + values.deadlineDay + "T" + values.deadlineHours + ":" + values.deadlineMinutes + ":00Z";
            //Zod validation
            const zodTest = toDoSchema.safeParse({name: values.nameOfToDo, desc: values.descOfToDo, datetime: deadlineParsed});
            if (!zodTest.success) {
                const err = Object.values(zodTest.error.formErrors.fieldErrors)[0];
                setAlert(Object.values(err)[0].toString());
            } else {
                submitApi(values.nameOfToDo, values.descOfToDo, deadlineParsed, referenceId);
            }
        }
    })

  return (
    <form tabIndex={1} className={collapse + " " + hidden} onSubmit={formik.handleSubmit}>
        <div className="collapse-title text-xl font-medium bg-primary-focus">
            <input onChange={formik.handleChange} id="nameOfToDo" value={formik.values.nameOfToDo} type="text" placeholder="Názov to-do" className="input border-0 w-full" />
        </div>
        <div className="collapse-content bg-primary">
                <label className="label cursor-pointer justify-start items-start flex-col">
                    <textarea onChange={formik.handleChange} id="descOfToDo" value={formik.values.descOfToDo} className="textarea textarea-primary w-full mb-2" placeholder="Popis"></textarea>
                    <label className='mb-2'>Deadline</label>
                    <div className='w-full'>
                        <input onChange={formik.handleChange} value={formik.values.deadlineDay} id="deadlineDay" type="text" placeholder="DD" className="input border-0 w-3/12 placeholder:text-center text-center" />
                        <label> . </label>
                        <input onChange={formik.handleChange} id="deadlineMonth" value={formik.values.deadlineMonth} type="text" placeholder="MM" className="input border-0 w-3/12 placeholder:text-center text-center" />
                        <label> . </label>
                        <input onChange={formik.handleChange} id="deadlineYear" value={formik.values.deadlineYear} type="text" placeholder="YYYY" className="input border-0 w-4/12 placeholder:text-center text-center" />
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input onChange={formik.handleChange} id="deadlineHours" value={formik.values.deadlineHours} type="text" placeholder="HH" className="input border-0 w-3/12 placeholder:text-center mt-2 text-center" />
                        <label> : </label>
                        <input onChange={formik.handleChange} id="deadlineMinutes" value={formik.values.deadlineMinutes} type="text" placeholder="MM" className="input border-0 w-3/12 placeholder:text-center text-center" />
                    </div>  
                </label>
            <div className='w-full flex justify-center h-content mt-4'>
                <button type="submit" className="btn btn-primary bg-base-100 mr-1">SAVE</button>
                <button onClick={discardClick} type="reset" className="btn btn-primary bg-base-100 ml-1">DISCARD</button>
            </div>
        </div>
    </form>
  )
}

export default CollapseToDoItemNew