const LoadingSpinner = (props: any) => {
    return (
      <div className={`${props.asOverlay && 'loading-spinner__overlay'} h-full w-full absolute top-0 left-0 bg-[#2C2F33] bg-opacity-90 flex justify-center items-center`}>
        <div className="lds-dual-ring"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;
  