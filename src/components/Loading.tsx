import { CircularProgress } from "@mui/material";

const Loading = () => {
    return (
        <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress />
        </div>
    );
}
 
export default Loading;