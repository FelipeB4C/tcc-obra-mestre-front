import './styles.css'

export const TitleTopic = ({src, alt, title}) => {
    return (
        <div className="title">
            <img src={src} alt={alt} />
            <h2>{title}</h2>
        </div>
    );
};