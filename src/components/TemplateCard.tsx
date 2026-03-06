import type { ComponentType, SVGProps } from "react";

type TemplateCardProps = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  paragraph: string;
};

const TemplateCard = ({ Icon, title, paragraph }: TemplateCardProps) => {
  return (
    <div className="h-52 w-full p-6  rounded-lg transition-shadow duration-300 hover:shadow-lg flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <Icon className="h-12 w-12 p-1 text-black rounded-full border-2 border-black" />
      <h1 className="font-bold text-lg mt-2">{title}</h1>
      <p className="mt-1 flex-1 overflow-hidden text-sm font-semibold leading-5 text-gray-500">
        {paragraph}
      </p>
    </div>
  );
};

export default TemplateCard;
