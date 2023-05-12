
type StepProps = {
  title: string,
  description?: string,
  link?: string
}
const StepTemplate = ({ title, description, link }: StepProps) => {
  return (
    <div id='step-container'
      className="h-[80px] w-fit bg-green-100 rounded-lg text-xl text-yellow-100 p-3 text-center
      flex flex-col justify-center align-center shadow-xl mb-5 ">

      <h4>{title}</h4>
      {description &&
        <p>{description}</p>
      }

      {link &&
        <div className={`h-16 z-10 fixed top-0 left-0 w-screen transition-all duration-200
         "bg-white" : "bg-transparent"`} >
          <a href={link}>🌐</a>
        </div>
      }
    </div>
  );
}

export default StepTemplate;

