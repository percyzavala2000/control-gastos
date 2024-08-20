
export const ErrorMessage = ({children}:{children:React.ReactNode}) => {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
      {children}
    </p>
  )
}