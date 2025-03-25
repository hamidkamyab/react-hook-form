
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
  const {register, control, handleSubmit, formState:{errors,isSubmitting},watch,setValue } = methods;
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
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const onSubmit = async(data) =>{
    await delay(2000);
    console.log("Submit form  ====>", data);
  }

  return (
    <>
      <h4>{watchUserName}</h4>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 justify-center bg-gray-200 p-8 rounded-lg shadow-md shadow-gray-300">
        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
          <label className='text-start' htmlFor="username">name</label>
          <input disabled={isSubmitting} type="text" className="w-52 border border-slate-300 p-1 rounded-md" {...register("username", {required:"نام کاربری الزامیست",minLength:{value:3,message:"نام کاربری نمیتواند کمتر از 3 کاراکتر باشد"}})} id="username" />
          </div>
          <small className='text-rose-500 font-medium text-[11px]'>{errors.username?.message}</small>
        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
           <label className='text-start' htmlFor="email">email</label>
            <input disabled={isSubmitting} type="email" id='email' className="w-52 border border-slate-300 p-1 rounded-md" {...register("email",{required:"ایمیل الزامیست",pattern:{value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,message:"فرمت ایمیل صحیح نمی باشد"}})} />
          </div>
          <small className='text-rose-500 font-medium text-[11px]'>{errors.email?.message}</small>

        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="channel">channel</label>
            <input disabled={isSubmitting} type="text" id='channel' className="w-52 border border-slate-300 p-1 rounded-md" {...register("channel",{required:"نام چنل الزامیست",minLength:{value:3,message:"نام کانال نمیتواند کمتر از 3 کاراکتر باشد"}})} />
          </div>
          <small className='text-rose-500 font-medium text-[11px]'>{errors.channel?.message}</small>

        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="channel">twitter</label>
            <input disabled={isSubmitting} type="text" id='twitter' className="w-52 border border-slate-300 p-1 rounded-md" {...register("social.twitter",{minLength:{value:3,message:"آیدی توییتر نمیتواند کمتر از 3 کاراکتر باشد"}})} />
          </div>
          <small className='text-rose-500 font-medium text-[11px]'>{errors.social?.twitter?.message}</small>

        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="channel">facebook</label>
            <input disabled={isSubmitting} type="text" id='facebook' className="w-52 border border-slate-300 p-1 rounded-md" {...register("social.facebook",{minLength:{value:3,message:"آیدی فیسبوک نمیتواند کمتر از 3 کاراکتر باشد"}})} />
          </div>
          <small className='text-rose-500 font-medium text-[11px]'>{errors.social?.facebook?.message}</small>

        </div>

        
        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="age">age</label>
            <input disabled={isSubmitting} type="text" id='age' className="w-52 border border-slate-300 p-1 rounded-md" {...register("age",{valueAsNumber:true})} />
          </div>
        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="age">birthday</label>
            <input disabled={isSubmitting} type="date" id='birthday' className="w-52 border border-slate-300 p-1 rounded-md" {...register("birthday",{valueAsDate:true})} />
          </div>

        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="primaryNumber">primary number</label>
            <input disabled={isSubmitting} type="text" id='primaryNumber' className="w-52 border border-slate-300 p-1 rounded-md" {...register("phones.0",{required:"شماره تماس اصلی الزامیست",pattern:{value: /^09\d{9}$/,message:"فرمت شماره تماس صحیح نمی باشد! نمونه: 09121001010"}})} />
          </div>
          <small className='text-rose-500 font-medium text-[11px]'>{errors?.phones?.[0]?.message}</small>

        </div>

        <div className='flex flex-col items-end gap-1'>
          <div className='flex gap-1 justify-end items-center'>
            <label className='text-start' htmlFor="secondaryNumber">secondary number</label>
            <input disabled={isSubmitting} type="text" id='secondaryNumber' className="w-52 border border-slate-300 p-1 rounded-md" {...register("phones.1",{pattern:{value: /^09\d{9}$/,message:"فرمت شماره تماس صحیح نمی باشد! نمونه: 09121001010"}})} />
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
                    <input disabled={isSubmitting}   type="text" id={`friendList-${index}`} className="w-52 border border-slate-300 p-1 rounded-md" {...register(`friends.${index}.fullname`,{required:"فیلد دوستان نمی تواند خالی باشد"})} />
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
          <button disabled={isSubmitting} type='submit' className="bg-whie hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center">
            <svg aria-hidden="true" role="status" className={`${isSubmitting?"inline":"hidden"}  w-4 h-4 me-3 text-white animate-spin`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            submit
          </button>
       
          <button type='button' onClick={handleSetValue} className='bg-blue-600 text-white mx-2' >set value</button>
        </div>
      </form>
      <DevTool control={control}/>
    </>
  )
}

export default App
