import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export function GenreSelectButton() {
    const arr = ["1", "2", "3"]
    return (
        <div >
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose Genre" />
                </SelectTrigger>
                <SelectContent>
                    {/* {arr.map((each) => <SelectItem value={"genre"}>{each}</SelectItem>)} */}
                </SelectContent>
            </Select>

        </div>
    )
}