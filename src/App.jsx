
import { useFieldArray, useForm } from 'react-hook-form'
import './App.css'
import { DevTool } from '@hookform/devtools';


function App() {

  const defaultVal = async() =>{
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
    const data = await response.json();
    return {
      username: data.username,
      email: data.email,
      channel: data.name,
      age:0,
      birthday: new Date(),
      social:{
        twitter: "",
        facebook:""
      },
      phones:[],
      friends:[{
        fullname:""
      }]
    }
  }

  const methods = useForm({
    defaultValues:defaultVal
  })
  const {register, control, handleSubmit, formState:{errors},watch,setValue} = methods;
  const watchUserName = watch("username")
  const {fields,append,remove} = useFieldArray({
    name: "friends",
    control
  })

  const handleSetValue = ()=>{
    setValue("username","Hamid",{
      shouldTouch:true
    })
  }

  const onSubmit = (data) =>{
    console.log("Submit form  ====>", data);
  }

  return (
    <>
      <h4>{watchUserName}</h4>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 justify-center bg-gray-200 p-8 rounded-lg shadow-md shadow-gray-300">
        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
          <label className='text-start' htmlFor="username">name</label>
          <input type="text" className="w-52 border border-slate-300 p-1 rounded-md" {...register("username", {required:"نام کاربری الزامیست",minLength:{value:3,message:"نام کاربری نمیتواند کمتر از 3 کاراکتر باشد"}})} id="username" />
          </div>
          <small className='text-rose-500 font-medium text-[11px]'>{errors.username?.message}</small>
        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
           <label className='text-start' htmlFor="email">email</label>
            <input type="email" id='email' className="w-52 border border-slate-300 p-1 rounded-md" {...register("email",{required:"ایمیل الزامیست",pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,message:"فرمت ایمیل صحیح نمی باشد"}})} />
          </div>
          <small className='text-rose-500 font-medium text-[11px]'>{errors.email?.message}</small>

        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="channel">channel</label>
            <input type="text" id='channel' className="w-52 border border-slate-300 p-1 rounded-md" {...register("channel",{required:"نام چنل الزامیست",minLength:{value:3,message:"نام کانال نمیتواند کمتر از 3 کاراکتر باشد"}})} />
          </div>
          <small className='text-rose-500 font-medium text-[11px]'>{errors.channel?.message}</small>

        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="channel">twitter</label>
            <input type="text" id='twitter' className="w-52 border border-slate-300 p-1 rounded-md" {...register("social.twitter",{minLength:{value:3,message:"آیدی توییتر نمیتواند کمتر از 3 کاراکتر باشد"}})} />
          </div>
          <small className='text-rose-500 font-medium text-[11px]'>{errors.social?.twitter?.message}</small>

        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="channel">facebook</label>
            <input type="text" id='facebook' className="w-52 border border-slate-300 p-1 rounded-md" {...register("social.facebook",{minLength:{value:3,message:"آیدی فیسبوک نمیتواند کمتر از 3 کاراکتر باشد"}})} />
          </div>
          <small className='text-rose-500 font-medium text-[11px]'>{errors.social?.facebook?.message}</small>

        </div>

        
        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="age">age</label>
            <input type="text" id='age' className="w-52 border border-slate-300 p-1 rounded-md" {...register("age",{valueAsNumber:true})} />
          </div>
        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="age">birthday</label>
            <input type="date" id='birthday' className="w-52 border border-slate-300 p-1 rounded-md" {...register("birthday",{valueAsDate:true})} />
          </div>

        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="primaryNumber">primary number</label>
            <input type="text" id='primaryNumber' className="w-52 border border-slate-300 p-1 rounded-md" {...register("phones.0",{required:"شماره تماس اصلی الزامیست",pattern:{value: /^09\d{9}$/,message:"فرمت شماره تماس صحیح نمی باشد! نمونه: 09121001010"}})} />
          </div>
          <small className='text-rose-500 font-medium text-[11px]'>{errors?.phones?.[0]?.message}</small>

        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="secondaryNumber">secondary number</label>
            <input type="text" id='secondaryNumber' className="w-52 border border-slate-300 p-1 rounded-md" {...register("phones.1",{pattern:{value: /^09\d{9}$/,message:"فرمت شماره تماس صحیح نمی باشد! نمونه: 09121001010"}})} />
          </div>
          <small className='text-rose-500 font-medium text-[11px]'>{errors?.phones?.[1]?.message}</small>

        </div>

        <div className='flex flex-col items-start gap-1'>
           <div className="flex gap-2">
           <label className='text-start' htmlFor="friendList-0">friends list</label>
            <button type='button' className='bg-green-500 p-2 text-xs' onClick={()=>{
            append({
              fullname:""
            })
            }} >افزودن</button>
           </div>
      
            <div className='flex flex-col gap-1 justify-end items-end w-full'>

            {
                fields.map((field, index)=>{
                  return <div key={index}  className='flex flex-col gap-1 '>
                    <input   type="text" id={`friendList-${index}`} className="w-52 border border-slate-300 p-1 rounded-md" {...register(`friends.${index}.fullname`,{required:"فیلد دوستان نمی تواند خالی باشد"})} />
                    <div className='flex gap-1 items-center justify-end w-full'>
                      <small className='text-rose-500 font-medium text-[11px]'>{errors?.friends?.[index]?.fullname?.message}</small>
                      {
                        index > 0 && <button type='button' className='bg-rose-500 text-white p-2 text-xs' onClick={()=>{remove(index)}} >حذف</button>
                      }
                    </div>
                  </div>
                })
            }

            </div>
           
          </div>
        


        <div>
          <button type='submit' >submit</button>
          <button type='button' onClick={handleSetValue} className='bg-blue-600 text-white mx-2' >set value</button>
        </div>
      </form>
      <DevTool control={control}/>
    </>
  )
}

export default App
