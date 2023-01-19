
const Loading = () => {
  return (
    <>
        <section className="flex flex-col justify-center items-center w-[100vh] h-[100vh] mx-auto">
        <h2 className="text-center mb-4 font-bold text-moradito">Cargando...</h2>
            <div className="lds-hourglass"> 
            </div>
        </section>
    </>
  )
}

export default Loading
