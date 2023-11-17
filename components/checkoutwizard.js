const Checkoutwizard = ({activestep = 0}) => {
    return(
        <div>
        {['login','adress','payment','makeorder'].map((x)=>(
            <div key={x}>{x}</div>
        ))}
        </div>
    )
}
export default Checkoutwizard