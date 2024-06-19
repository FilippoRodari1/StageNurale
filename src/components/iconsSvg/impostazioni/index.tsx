interface Props {
    color?: string;
    width?: number;
    height?: number;
}


const Impostazioni = ({color='#041E42', width= 20, height = 20}: Props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
    >
        <path
        fill={color}
        d="m11.78 2.801-.995.1.995-.1Zm-.06-.421-.958.287.958-.287Zm.175 1.175-.929.37.929-.37Zm1.323.548-.395-.92.395.92Zm.614-.452-.555-.832-.04.027-.039.031.634.774Zm0 0 .554.832.041-.027.038-.031-.633-.774Zm.34-.255-.475-.88.475.88Zm1.035.051.56-.828-.56.828Zm.313.288-.707.707.707-.707Zm.745.745.707-.707-.707.707Zm.288.313-.829.56.829-.56Zm.051 1.035.88.474-.88-.474Zm-.255.34.707.708.035-.036.032-.038-.774-.634Zm0 0-.707-.707-.035.036-.032.038.774.633Zm-.452.614-.919-.394.92.394Zm.548 1.323.371-.928-.37.928Zm.754.115-.1.995.1-.995Zm.421.06-.287.958.287-.958Zm.695.768.982-.19-.982.19Zm0 1.904-.982-.19.982.19Zm-.695.768-.287-.958.287.958Zm-.421.06-.1-.995.1.995Zm-.753.115-.37-.93.37.93Zm-.548 1.323.919-.395-.92.395Zm.451.613-.774.634.032.038.035.035.707-.707Zm0 0 .774-.633-.031-.039-.036-.035-.707.707Zm.255.34-.88.476.88-.475Zm-.051 1.036-.829-.56.829.56Zm-1.346 1.345.56.829-.56-.829Zm-1.035.052-.474.88.474-.88Zm-.34-.255.633-.774-.038-.031-.04-.027-.555.832Zm0 0-.64.768.04.034.045.03.555-.832Zm0 0 .64-.769-.007-.005-.633.774Zm-.614-.452-.395.919.395-.919Zm-1.323.548-.929-.37.929.37Zm-.115.754.995.1-.995-.1Zm-.06.421.958.287-.958-.287Zm-.768.695-.19-.982.19.982Zm-1.904 0-.19.982.19-.982Zm-.768-.695-.958.287.958-.287Zm-.06-.421.995-.1-.003-.032-.006-.033-.986.165Zm0 0-.995.1.003.032.006.032.986-.164Zm-.115-.754.929-.37-.929.37Zm-1.323-.548.395.92-.395-.92Zm-.614.452.634.774-.634-.774Zm-.34.255.474.88-.474-.88Zm-1.035-.051.56-.829-.56.829Zm-.313-.288-.707.707.707-.707Zm-.745-.745-.707.707.707-.707Zm-.288-.313-.828.56.828-.56Zm-.051-1.035.88.475-.88-.475Zm.255-.34.774.633.007-.009.007-.009-.788-.615Zm0 0-.768-.64-.01.011-.01.013.788.616Zm0 0 .768.64.006-.007-.774-.633Zm.452-.614.919.394-.92-.394Zm-.548-1.323.37-.929-.37.929ZM2.8 11.78l-.163.987.032.005.032.003.1-.995Zm0 0 .163-.986-.032-.006-.031-.003-.1.995Zm-.421-.06-.287.958.287-.958Zm-.695-.768.982-.19-.982.19Zm-.018-.425h-1 1Zm0-1.053h1-1Zm.018-.426-.982-.19.982.19Zm.695-.768-.287-.958.287.958Zm.421-.06-.066-.998-.017.001-.016.002.1.995Zm0 0 .067.998.016-.001.017-.002-.1-.995Zm.754-.115.371.929-.37-.929Zm.548-1.323.919-.394-.919.394Zm-.452-.614-.8.6.013.017.013.016.774-.633Zm0 0 .8-.6-.013-.017-.013-.016-.774.633Zm-.255-.34.88-.475-.88.474Zm.051-1.035.829.56-.829-.56Zm.288-.314.707.707-.707-.707Zm.745-.744.707.707-.707-.707Zm.313-.288.56.829-.56-.829Zm1.035-.052.474-.88-.474.88Zm.34.256-.633.774.634-.774Zm.614.451.395-.919-.395.92Zm1.323-.548-.928-.37.928.37Zm.115-.753-.995-.1.995.1Zm.06-.421.958.287-.958-.287Zm.768-.695.19.982-.19-.982Zm1.904 0-.19.982.19-.982Zm1.823 1.017c-.017-.175-.036-.402-.097-.609l-1.916.574c-.008-.025-.007-.032-.001.009.006.046.013.108.024.225l1.99-.2Zm.048.482c.02.05.015.062 0-.039a12.907 12.907 0 0 1-.048-.443l-1.99.199c.02.199.038.378.058.523.02.139.05.32.123.502l1.857-.742Zm0 0-1.857.742a2 2 0 0 0 2.646 1.096l-.789-1.838Zm.375-.307c-.168.137-.27.221-.347.28-.082.06-.077.048-.028.027l.79 1.838c.178-.077.329-.184.44-.268.118-.088.257-.202.412-.33l-1.267-1.547Zm.079-.058 1.11 1.664-1.11-1.664Zm.42-.303c-.19.102-.363.25-.499.361l1.267 1.548c.09-.074.14-.114.176-.142.033-.025.029-.02.006-.007l-.95-1.76Zm2.07.103a2 2 0 0 0-2.07-.103l.95 1.76 1.12-1.657Zm.46.41c-.124-.125-.282-.29-.46-.41l-1.12 1.657c-.022-.015-.025-.02.005.008.034.031.078.076.161.158l1.414-1.414Zm.745.744-.745-.745-1.414 1.414.745.745 1.414-1.414Zm.41.46c-.122-.178-.286-.336-.41-.46l-1.414 1.414c.082.083.127.127.158.16.029.031.023.028.008.006l1.657-1.12Zm.102 2.07a2 2 0 0 0-.103-2.07l-1.657 1.12 1.76.95Zm-.361.499c.111-.136.259-.31.361-.5l-1.76-.949c.012-.023.018-.027-.007.006a7.613 7.613 0 0 1-.142.176l1.548 1.267Zm-.067.074L15.642 5.46l1.414 1.415Zm-.24.3c-.021.05-.034.055.028-.027.058-.077.142-.18.279-.347l-1.548-1.267c-.127.155-.24.294-.329.411a2.155 2.155 0 0 0-.268.442l1.838.789Zm0 0-1.838-.788a2 2 0 0 0 1.097 2.646l.741-1.857Zm.482.049a12.787 12.787 0 0 1-.443-.049c-.102-.014-.089-.02-.039 0l-.741 1.858c.18.072.362.103.501.123.145.02.324.038.523.058l.2-1.99Zm.609.097c-.207-.061-.434-.08-.609-.097l-.199 1.99c.117.012.18.018.225.024.041.006.034.007.01 0l.573-1.917Zm1.39 1.536a2 2 0 0 0-1.39-1.536l-.574 1.916 1.964-.38Zm.036.616c0-.176.005-.404-.036-.616l-1.964.38c-.005-.025-.003-.032-.001.01l.001.226h2Zm0 1.053V9.474h-2v1.053h2Zm-.036.615c.04-.212.036-.44.036-.615h-2l-.001.226c-.002.041-.004.034.001.009l1.964.38Zm-1.39 1.536a2 2 0 0 0 1.39-1.536l-1.964-.38.574 1.916Zm-.609.097c.175-.017.402-.036.609-.097l-.574-1.916c.025-.008.032-.007-.009-.001a7.27 7.27 0 0 1-.225.024l.2 1.99Zm-.481.048c-.05.02-.063.015.038 0 .096-.013.228-.026.443-.048l-.199-1.99c-.199.02-.378.038-.523.058-.138.02-.32.05-.5.123l.74 1.857Zm0 0-.742-1.857a2 2 0 0 0-1.096 2.647l1.838-.79Zm.306.375c-.137-.168-.221-.27-.279-.347-.062-.082-.049-.077-.027-.028l-1.838.79c.077.178.183.329.268.44.087.118.202.257.328.412l1.548-1.267Zm-.067-.074-1.414 1.414 1.414-1.414Zm0 0-1.414 1.415 1.414-1.415Zm.428.573c-.102-.19-.25-.363-.36-.499l-1.549 1.267.142.175c.025.034.02.03.007.006l1.76-.949Zm-.103 2.07a2 2 0 0 0 .103-2.07l-1.76.95 1.657 1.12Zm-.409.46c.124-.124.288-.282.41-.46l-1.658-1.12c.015-.022.02-.026-.008.005a7.516 7.516 0 0 1-.158.16l1.414 1.415Zm-.745.745.745-.745-1.414-1.414-.745.744 1.414 1.415Zm-.46.409c.178-.12.336-.285.46-.41l-1.414-1.414a7.624 7.624 0 0 1-.16.159c-.031.028-.028.022-.006.008l1.12 1.657Zm-2.07.103a2 2 0 0 0 2.07-.103l-1.12-1.657-.95 1.76Zm-.499-.361c.136.11.31.259.5.361l.949-1.76c.023.012.027.018-.006-.007a7.669 7.669 0 0 1-.176-.142l-1.267 1.548Zm.079.058 1.11-1.664-1.11 1.664Zm-.086-.064 1.28-1.537-1.28 1.537Zm-.368-.301c-.049-.021-.054-.034.028.027.077.058.18.142.347.28l1.267-1.548c-.155-.127-.294-.241-.411-.33a2.157 2.157 0 0 0-.442-.267l-.789 1.838Zm0 0 .79-1.838a2 2 0 0 0-2.647 1.096l1.857.742Zm-.048.482c.022-.216.035-.348.049-.443.014-.102.02-.089 0-.04l-1.858-.74c-.072.18-.103.362-.123.5-.02.146-.038.325-.058.524l1.99.2Zm-.097.609c.061-.207.08-.434.097-.609l-1.99-.199c-.011.117-.018.18-.024.225-.006.041-.007.034 0 .01l1.917.573Zm-1.536 1.39a2 2 0 0 0 1.536-1.39l-1.916-.574.38 1.964Zm-.616.036c.176 0 .404.005.616-.036l-.38-1.964c.025-.005.032-.003-.01-.001l-.226.001v2Zm-1.052 0h1.052v-2H9.474v2Zm-.616-.036c.212.04.44.036.616.036v-2l-.227-.001c-.041-.002-.034-.004-.009.001l-.38 1.964Zm-1.536-1.39a2 2 0 0 0 1.536 1.39l.38-1.964-1.916.574Zm-.097-.609c.017.175.036.402.097.609l1.916-.574c.008.025.007.032.001-.009a7.602 7.602 0 0 1-.024-.225l-1.99.2Zm.009.065 1.972-.329-1.972.33Zm0 0 1.972-.329-1.972.33Zm-.057-.547c-.02-.05-.015-.062 0 .039.013.096.026.227.048.443l1.99-.199c-.02-.199-.038-.378-.058-.523-.02-.139-.05-.32-.123-.502l-1.857.742Zm0 0 1.857-.742a2 2 0 0 0-2.646-1.096l.789 1.838Zm-.375.307c.168-.137.27-.221.347-.28.082-.06.077-.048.028-.027l-.79-1.838a2.16 2.16 0 0 0-.44.268c-.118.088-.257.202-.412.33l1.267 1.547Zm-.5.361c.19-.102.364-.25.5-.361l-1.267-1.548c-.09.074-.14.114-.176.142-.033.025-.029.02-.006.007l.95 1.76Zm-2.069-.103a2 2 0 0 0 2.07.103l-.95-1.76-1.12 1.657Zm-.46-.409c.124.124.282.288.46.41l1.12-1.658c.022.015.025.02-.005-.008a7.518 7.518 0 0 1-.161-.158l-1.414 1.414Zm-.745-.745.745.745 1.414-1.414-.745-.745-1.414 1.414Zm-.41-.46c.121.178.286.336.41.46l1.414-1.414a7.581 7.581 0 0 1-.158-.16c-.029-.031-.023-.028-.008-.006l-1.657 1.12Zm-.102-2.07a2 2 0 0 0 .103 2.07l1.657-1.12-1.76-.95Zm.361-.499c-.111.136-.26.31-.361.5l1.76.949c-.012.023-.018.027.007-.006.028-.037.068-.086.142-.176l-1.548-1.267Zm-.014.018 1.576 1.231-1.576-1.231Zm.02-.025 1.536 1.28-1.536-1.28Zm.3-.368c.022-.049.035-.054-.027.028-.058.077-.142.18-.279.347l1.548 1.267c.127-.155.24-.294.329-.411.084-.112.19-.263.268-.442l-1.838-.789Zm0 0 1.839.79a2 2 0 0 0-1.096-2.647l-.742 1.857Zm-.481-.048c.216.022.348.035.443.049.101.014.089.02.039 0l.742-1.858a2.16 2.16 0 0 0-.502-.123c-.145-.02-.324-.038-.523-.058l-.2 1.99Zm-.064-.008.326-1.973-.326 1.973Zm-.545-.09c.207.063.434.08.609.098l.199-1.99a7.273 7.273 0 0 1-.225-.024c-.041-.006-.034-.007-.01 0l-.573 1.917Zm-1.39-1.535a2 2 0 0 0 1.39 1.536l.574-1.916-1.964.38Zm-.036-.615c0 .175-.005.403.036.615l1.964-.38c.005.025.003.032.001-.01a7.652 7.652 0 0 1-.001-.226h-2Zm0-1.053v1.053h2V9.474h-2Zm.036-.616c-.04.212-.036.44-.036.616h2l.001-.227c.002-.041.004-.034-.001-.009l-1.964-.38Zm1.39-1.536a2 2 0 0 0-1.39 1.536l1.964.38-.574-1.916Zm.609-.097c-.175.017-.402.036-.609.097l.574 1.916c-.025.008-.032.007.009.001.046-.006.108-.012.225-.024l-.2-1.99Zm.033-.003.133 1.996-.133-1.996Zm.45-.045c.049-.02.062-.015-.04 0a12.76 12.76 0 0 1-.443.048l.199 1.99c.199-.02.378-.038.523-.058.139-.02.321-.05.502-.123l-.742-1.857Zm0 0 .741 1.857a2 2 0 0 0 1.096-2.646l-1.838.789ZM2.876 6.8c.138.168.221.271.28.348.061.082.048.077.027.028l1.838-.789a2.155 2.155 0 0 0-.268-.442c-.088-.117-.202-.256-.329-.411L2.877 6.801Zm-.026-.033 1.6-1.2-1.6 1.2Zm-.335-.466c.102.19.25.363.361.5l1.548-1.267a7.678 7.678 0 0 1-.142-.176c-.025-.033-.02-.029-.007-.006l-1.76.949Zm.103-2.069a2 2 0 0 0-.103 2.069l1.76-.95-1.657-1.119Zm.41-.46c-.125.123-.29.281-.41.46l1.657 1.12c-.015.021-.02.025.008-.005.031-.034.076-.079.158-.162L3.028 3.772Zm.744-.745-.745.744 1.414 1.414.745-.744-1.414-1.414Zm.46-.41c-.178.121-.336.286-.46.41l1.414 1.414.16-.159c.031-.028.028-.022.006-.007l-1.12-1.658Zm2.07-.103a2 2 0 0 0-2.07.103l1.12 1.658.95-1.76Zm.499.362c-.136-.112-.31-.26-.5-.362l-.949 1.76c-.023-.012-.027-.018.006.008.037.028.086.067.176.142l1.267-1.548Zm.375.306c.049.022.054.035-.028-.027-.077-.058-.18-.142-.347-.28L5.535 4.426c.155.126.294.24.411.328.112.085.263.191.442.268l.789-1.838Zm0 0-.79 1.838a2 2 0 0 0 2.647-1.096l-1.857-.742Zm.048-.481c-.022.215-.035.347-.049.443-.014.101-.02.088 0 .038l1.858.742c.072-.18.103-.363.123-.501.02-.145.038-.324.058-.523l-1.99-.2Zm.097-.609c-.061.207-.08.434-.097.609l1.99.199c.012-.117.018-.18.024-.225.006-.041.007-.034 0-.01l-1.917-.573ZM8.858.703a2 2 0 0 0-1.536 1.39l1.916.574-.38-1.964Zm.615-.036c-.175 0-.403-.005-.615.036l.38 1.964c-.025.005-.032.003.01.001a7.69 7.69 0 0 1 .225-.001v-2Zm1.053 0H9.474v2h1.053v-2Zm.616.036c-.212-.04-.44-.036-.615-.036v2l.226.001c.041.002.034.004.009-.001l.38-1.964Zm1.536 1.39a2 2 0 0 0-1.536-1.39l-.38 1.964 1.916-.574ZM12.333 10A2.333 2.333 0 0 1 10 12.333v2A4.333 4.333 0 0 0 14.333 10h-2ZM10 7.667A2.333 2.333 0 0 1 12.333 10h2A4.333 4.333 0 0 0 10 5.667v2ZM7.667 10A2.333 2.333 0 0 1 10 7.667v-2A4.333 4.333 0 0 0 5.667 10h2ZM10 12.333A2.333 2.333 0 0 1 7.667 10h-2A4.333 4.333 0 0 0 10 14.333v-2Z"
        />
    </svg>
)
export default Impostazioni