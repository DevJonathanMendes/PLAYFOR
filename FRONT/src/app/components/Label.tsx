type LabelProps = {
  htmlFor: string;
  content: string;
};

export default function Label(props: LabelProps) {
  return (
    <label htmlFor={props.htmlFor} className={style}>
      {props?.content}
    </label>
  );
}

const style = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
