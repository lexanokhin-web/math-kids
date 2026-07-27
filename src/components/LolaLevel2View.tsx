import { lolaSentencesLvl2 } from '../utils/syllablesData';
import ReadingViewTemplate from './ReadingViewTemplate';

const LolaLevel2View = () => {
    return (
        <ReadingViewTemplate 
            data={lolaSentencesLvl2} 
            title="Sentences Lola (Level 2)" 
            storageKey="mathkids_reading_font_size"
            defaultFontSize={2.5}
        />
    );
};

export default LolaLevel2View;
