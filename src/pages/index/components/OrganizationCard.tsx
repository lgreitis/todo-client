import { Card } from "@geist-ui/core";

interface Props {
  name: string;
  ownerName: string;
  userCount: number;
  id: string;
}

const OrganizationCard = (props: Props) => {
  const { name, ownerName } = props;

  return (
    <Card hoverable width="100%">
      {name}
    </Card>
  );
};

export default OrganizationCard;
