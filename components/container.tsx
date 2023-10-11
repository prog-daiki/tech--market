type ContainerProps = {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  children
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-2 md:px-12 xl:px-20">
      {children}
    </div>
  )
}

export default Container
