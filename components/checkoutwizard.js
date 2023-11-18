const Checkoutwizard = ({activestep = 0}) => {
    return(
        <div className="mb-5 flex flex-wrap">
        {['login','adress','payment','makeorder'].map((step, index)=>(
            <div key={step}
            className={`flex-1 border-b-2  
          text-center 
       ${
         index <= activestep
           ? 'border-indigo-500   text-indigo-500'
           : 'border-gray-400 text-gray-400'
       }
          
       `}
          >{step}</div>
        ))}
        </div>
    )
}
export default Checkoutwizard