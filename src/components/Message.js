import { ContextParser } from "jsonld-context-parser";

export default function Message({data}) {

    const myParser = new ContextParser();

    return (
        <div>
            <p className="input-field">{data.user.username}</p>
            <div className={data.user != null ? 'message user purple' : 'message bot white'}>{data.content}</div>
        </div>
    );
}