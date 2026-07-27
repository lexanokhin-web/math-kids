import { lolaStoriesLvl3 } from '../utils/syllablesData';
import ReadingViewTemplate from './ReadingViewTemplate';

const LolaLevel3View = () => {
    return (
        <ReadingViewTemplate 
            data={lolaStoriesLvl3} 
            title="Stories Lola (Level 3)" 
            storageKey="mathkids_reading_font_size_lvl3"
            defaultFontSize={2.0}
            showStoriesMode={true}
        />
    );
};

export default LolaLevel3View;
