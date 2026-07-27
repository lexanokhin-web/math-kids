import { lolaStoriesLvl4 } from '../utils/syllablesData';
import ReadingViewTemplate from './ReadingViewTemplate';

const LolaLevel4View = () => {
    return (
        <ReadingViewTemplate 
            data={lolaStoriesLvl4} 
            title="Stories Lola (Level 4)" 
            storageKey="mathkids_reading_font_size_lvl4"
            defaultFontSize={1.8}
            showStoriesMode={true}
        />
    );
};

export default LolaLevel4View;
