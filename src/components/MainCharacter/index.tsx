import { CheffDroid } from "@/assets";
import { ImageIcon } from "@/common";
import { CheffDroidContainer } from "./styles";

type CheffDroidProps = {
  size: number;
};

export const Droid: React.FC<CheffDroidProps> = ({
  size
}) => {
  const sizeInPixel = `${size}px`;
  return (
    <CheffDroidContainer>
      <ImageIcon height={sizeInPixel} width={sizeInPixel} src={CheffDroid} />
    </CheffDroidContainer>
  )
};
