import Image from "next/image";

interface Props {
  title: string;
  iconSrc: string;
  value: string;
}

const PriceInfoCard = ({ title, iconSrc, value }: Props) => {
  return (
    <div className={`price-info_card`}>
      <p className="text-base text-text-muted">{title}</p>

      <div className="flex gap-1 items-center">
        <Image src={iconSrc} alt={title} width={24} height={24} style={{ filter: "invert(1) opacity(0.7)" }} />

        <p className="text-2xl font-bold text-text-primary">{value}</p>
      </div>
    </div>
  )
}

export default PriceInfoCard