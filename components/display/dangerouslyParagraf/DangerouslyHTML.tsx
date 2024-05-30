"use client";
type Props = {
  content: string;
  classname: string;
};

const DangerouslyHTML = ({ content, classname }: Props) => {
  return (
    <div
      className={classname}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

export default DangerouslyHTML;
