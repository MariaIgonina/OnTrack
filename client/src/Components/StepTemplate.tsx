
type StepProps = {
  step: any
}
const StepTemplate = ({ step }: StepProps) => {
  return (
    <div id='step-container' className="h-[80px] w-[200px] bg-green-100 rounded-lg text-xl text-yellow-100 p-3 flex justify-center shadow-xl 
    hover:-translate-y-1 hover:border hover:border-yellow-100 hover:border-2 ">
        {step}
    </div>);
}

export default StepTemplate;

