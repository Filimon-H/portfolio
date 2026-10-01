export default function Container({ className = '', children }) {
  return <div className={`max-w-[1240px] mx-auto px-gutter-sm lg:px-gutter ${className}`}>{children}</div>
}
