import { Card, CardHeader, CardBody } from "@/shared/ui/components/hero-ui";

interface ContentUnavailableProps {
  title?: string;
  description?: string;
}

/**
 * Reusable warning-style block for temporarily unavailable content.
 */
const ContentUnavailable: React.FC<ContentUnavailableProps> = ({
  title = "Content temporarily unavailable",
  description = "We could not load this content right now. Please try again later.",
}) => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <Card className="border border-warning-500/60 bg-warning-50/10">
        <CardHeader>
          <h2 className="text-xl font-semibold text-warning-500">{title}</h2>
        </CardHeader>
        <CardBody>
          <p className="text-warning-400 text-sm">{description}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContentUnavailable;
