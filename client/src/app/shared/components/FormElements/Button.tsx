import Link from "next/link";

const Button = (props: any) => {
  if (props.href) {
    return (
      <Link href={props.href}>
        <a
          className={`
            ${props.size === 'small' ? 'text-sm' : ''}
            ${props.size === 'big' ? 'text-lg' : ''}
            inline-block px-4 py-2 border rounded
            ${props.primary ? 'text-white bg-[#5865F2] hover:bg-blue-500': ''}
            ${props.inverse ? 'text-primary border-primary bg-transparent' : 'text-white border-primary bg-primary'}
            ${props.secondary ? 'text-white bg-[#a7a7a7] hover:bg-[#b4b4b4]' : 'text-white border-primary bg-primary'}
            ${props.danger ? `border-${props.danger} bg-${props.danger} hover:bg-dangerHover` : ''}
            ${props.disabled ? 'bg-gray-400 text-gray-700 border-gray-400 cursor-not-allowed' : ''}
          `}
        >
          {props.children}
        </a>
      </Link>
    );
  }

  return (
    <button
      className={`
        ${props.size === 'small' ? 'text-sm' : ''}
        ${props.size === 'big' ? 'text-lg' : ''}
        inline-block px-4 py-2 border rounded mr-2
        ${props.primary ? 'text-white bg-[#5865F2] hover:bg-blue-500': ''}
        ${props.inverse ? 'text-primary border-primary bg-transparent' : 'text-white border-primary bg-primary'}
        ${props.secondary ? 'text-white bg-[#a7a7a7] hover:bg-[#b4b4b4]' : 'text-white border-primary bg-primary'}
        ${props.circle ? 'text-white bg-[#5865F2] hover:bg-blue-500 rounded-full': ''}
        ${props.danger ? `bg-[#FF4C4C] hover:bg-[#f34343]` : ''}
        ${props.wide ? 'border-none w-full' : ''}
        ${props.disabled ? 'bg-gray-400 text-gray-700 border-gray-400 cursor-not-allowed' : 'text-white bg-[#5865F2] hover:bg-blue-500'}
      `}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
