export default function Message({data}) {
    return (
        <div>
            <h7 class="input-field">{data.user}</h7>
            <div className={data.user != null ? 'message user purple' : 'message bot white'}>{data.content}</div>
        </div>
    );
}