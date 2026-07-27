import { elsaAnnaSentences } from '../utils/syllablesData';
import ReadingViewTemplate from './ReadingViewTemplate';

const ElsaAnnaView = () => {
    return (
        <ReadingViewTemplate 
            data={elsaAnnaSentences} 
            title="Elsa & Anna Stories" 
            storageKey="mathkids_reading_font_size_frozen"
            defaultFontSize={2.5}
            showStoriesMode={true}
        />
    );
};

export default ElsaAnnaView;
