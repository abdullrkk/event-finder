import { Card, CardContent } from "@/components/ui/card";

type EventCardProps = {
    title: string;
    date: string;
    location: string;
};

export default function EventCard({ title, date, location }: EventCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 space-y-1">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-sm text-gray-500">{date} - {location}</p>
            </CardContent>
        </Card>
    );
}
