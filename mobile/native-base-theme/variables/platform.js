// @flow

import color from 'color'
import { Platform, Dimensions, PixelRatio } from 'react-native'
import { PLATFORM } from './commonColor'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const platform = Platform.OS
const platformStyle = undefined
const isIphoneX =
  platform === PLATFORM.IOS &&
  (deviceHeight === 812 ||
    deviceWidth === 812 ||
    deviceHeight === 896 ||
    deviceWidth === 896)

export default {

  // brand colors

  brandPrimary: '#ef6235',
  brandInfo: '#3ca7f7',
  brandSuccess: '#61ce35',
  brandDanger: '#ee3834',
  brandWarning: '#f7b142',
  brandDark: '#fff',
  brandLight: '#000',

  // Accordion
  accordionBorderColor: '#d3d3d3',
  accordionContentPadding: 10,
  accordionIconFontSize: 18,
  contentStyle: '#f5f4f5',
  expandedIconStyle: '#000',
  headerStyle: '#edebed',
  iconStyle: '#000',

  // ActionSheet
  elevation: 4,
  containerTouchableBackgroundColor: 'rgba(0,0,0,0.4)',
  innerTouchableBackgroundColor: '#fff',
  listItemHeight: 50,
  listItemBorderColor: '#d3d3d3',
  marginHorizontal: -15,
  marginLeft: 14,
  marginTop: 15,
  minHeight: 56,
  padding: 15,
  touchableTextColor: '#757575',

  // Android
  androidRipple: true,
  androidRippleColor: 'rgba(256, 256, 256, 0.3)',
  androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',
  buttonUppercaseAndroidText: true,

  // Badge
  badgeBg: '#ED1727',
  badgeColor: '#fff',
  badgePadding: platform === PLATFORM.IOS ? 3 : 0,

  // checkbox

  CheckboxBorderWidth: platform === PLATFORM.IOS ? 1 : 2,
  CheckboxPaddingLeft: platform === PLATFORM.IOS ? 4 : 2,
  CheckboxPaddingBottom: platform === PLATFORM.IOS ? 0 : 5,
  CheckboxIconSize: platform === PLATFORM.IOS ? 21 : 16,
  CheckboxIconMarginTop: platform === PLATFORM.IOS ? undefined : 1,
  CheckboxFontSize: platform === PLATFORM.IOS ? 23 / 0.9 : 17,
  checkboxBgColor: '#039BE5',
  checkboxSize: 20,
  checkboxTickColor: '#fff',
  checkboxDefaultColor: 'transparent',
  checkboxTextShadowRadius: 0,
  CheckboxRadius: 4,

  // commonn
  platformStyle,
  platform,
  deviceWidth,
  deviceHeight,
  isIphoneX,
  textColor: '#000',
  inverseTextColor: '#fff',
  noteFontSize: 14,
  titleFontfamily: 'System',
  titleFontSize: 19,
  subTitleFontSize: 14,
  subtitleColor: '#000',
  titleFontColor: '#000',
  borderRadiusBase: 5,
  containerBgColor: '#fff',
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: 10,
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  inputGroupRoundedBorderRadius: 30,

  Inset: {
    portrait: {
      topInset: 24,
      leftInset: 0,
      rightInset: 0,
      bottomInset: 34
    },
    landscape: {
      topInset: 0,
      leftInset: 44,
      rightInset: 44,
      bottomInset: 21
    }
  },

  // text

  get defaultTextColor () {
    return this.textColor
  },

  // tabs

  tabFontSize: 15,

  // tab bar
  tabBarDisabledTextColor: '#BDBDBD',
  tabDefaultBg: '#F8F8F8',
  topTabBarTextColor: '#fff',
  topTabBarActiveTextColor: '#fff',
  topTabBarBorderColor: '#d3d3d3',
  topTabBarActiveBorderColor: '#ef6235',

  // spinner
  defaultSpinnerColor: 'rgba(155,155,155,1)',
  inverseSpinnerColor: '#1A191B',

  // segment

  segmentActiveBackgroundColor: platform === PLATFORM.IOS ? '#007aff' : '#fff',
  segmentTextColor: 'rgba(239,98,55,1)',
  segmentActiveTextColor: '#fff',
  segmentBorderColor: '#fff',
  segmentBorderColorMain: '#3F51B5',
  segmentBackgroundColor: '#fff',

  // radio button

  radioBtnSize: platform === PLATFORM.IOS ? 25 : 23,
  get radioColor () {
    return this.brandPrimary
  },
  radioSelectedColorAndroid: '#5067FF',
  radioBtnLineHeight: 29,

  // progress bar

  defaultProgressColor: '#E4202D',
  inverseProgressColor: '#1A191B',

  // list

  listItemPadding: platform === PLATFORM.IOS ? 10 : 12,
  listBg: '#FFF',
  listBorderColor: 'rgba(155,155,155,1)',
  listDividerBg: '#f4f4f4',
  listBtnUnderlayColor: '#DDD',
  listNoteColor: 'rgba(74,74,74,1)',
  listNoteSize: 13,
  listItemSelected: platform === PLATFORM.IOS ? '#007aff' : '#3F51B5',

  // line height

  lineHeight: platform === PLATFORM.IOS ? 20 : 24,
  buttonLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH3: 22,
  lineHeightH2: 27,

  // input Group

  inputSuccessBorderColor: 'rgba(98,207,54,1)',
  inputErrorBorderColor: 'rgba(238,56,52,1)',
  inputHeightBase: 50,
  inputFontSize: 17,
  inputBorderColor: '#D9D5DC',
  get inputColor () {
    return this.textColor
  },
  get inputColorPlaceholder () {
    return '#575757'
  },

  // icon

  iconFontSize: platform === PLATFORM.IOS ? 30 : 28,
  iconHeaderSize: platform === PLATFORM.IOS ? 33 : 24,
  iconFamily: 'Feather',

  // header

  toolbarHeight: platform === PLATFORM.IOS ? 64 : 56,
  toolbarSearchIconSize: platform === PLATFORM.IOS ? 20 : 23,
  iosStatusbar: 'dark-content',
  toolbarBtnColor: 'rgba(0,0,0,1)',
  toolbarDefaultBg: '#F8F8F8',
  toolbarInputColor: '#fff',
  toolbarBtnTextColor: 'rgba(239,98,55,1)',
  toolbarDefaultBorder: '#fff',
  searchBarHeight: platform === PLATFORM.IOS ? 30 : 40,
  searchBarInputHeight: platform === PLATFORM.IOS ? 30 : 50,
  get statusBarColor () {
    return color(this.toolbarDefaultBg)
      .darken(0.2)
      .hex()
  },
  get darkenHeader () {
    return color(this.tabBgColor)
      .darken(0.03)
      .hex()
  },

  // footer -tab

  tabBarTextSize: platform === PLATFORM.IOS ? 14 : 11,
  tabBarTextColor: '#000',
  activeTab: '#fff',
  sTabBarActiveTextColor: 'rgba(239,98,55,1)',
  tabBarActiveTextColor: 'rgba(239,98,55,1)',
  tabActiveBgColor: '#fff',

  // footer

  footerHeight: 55,
  footerDefaultBg: '#fff',
  footerPaddingBottom: 0,

  // font

  DefaultFontSize: 17,
  fontFamily: 'System',
  fontSizeBase: 15,
  get fontSizeH1 () {
    return this.fontSizeBase * 1.8
  },
  get fontSizeH2 () {
    return this.fontSizeBase * 1.6
  },
  get fontSizeH3 () {
    return this.fontSizeBase * 1.4
  },

  // fab

  fabBackgroundColor: 'blue',
  fabBorderRadius: 28,
  fabBottom: 0,
  fabButtonBorderRadius: 20,
  fabButtonHeight: 40,
  fabButtonLeft: 7,
  fabButtonMarginBottom: 10,
  fabContainerBottom: 20,
  fabDefaultPosition: 20,
  fabElevation: 4,
  fabIconColor: '#fff',
  fabIconSize: 24,
  fabShadowColor: '#000',
  fabShadowOffsetHeight: 2,
  fabShadowOffsetWidth: 0,
  fabShadowOpacity: 0.4,
  fabShadowRadius: 2,
  fabWidth: 56,

  // datepicker

  datePickerFlex: 1,
  datePickerPadding: 10,
  datePickerTextColor: '#000',
  datePickerBg: 'transparent',

  // card

  cardDefaultBg: '#fff',
  cardBorderRadius: 2,
  cardItemPadding: platform === PLATFORM.IOS ? 10 : 12,
  cardBorderColor: '#fff',

  // buttons

  btnTextSize: 16.5,
  btnTextSizeLarge: 22.5,
  btnTextSizeSmall: 12,

  // Button
  buttonFontFamily: 'System',
  buttonDisabledBg: '#b5b5b5',
  buttonPadding: 6,
  buttonDefaultActiveOpacity: 0.5,
  buttonDefaultFlex: 1,
  buttonDefaultBorderRadius: 2,
  buttonDefaultBorderWidth: 1,

  get buttonPrimaryBg () {
    return this.brandPrimary
  },
  get buttonPrimaryColor () {
    return this.inverseTextColor
  },
  get buttonInfoBg () {
    return this.brandInfo
  },
  get buttonInfoColor () {
    return this.inverseTextColor
  },
  get buttonSuccessBg () {
    return this.brandSuccess
  },
  get buttonSuccessColor () {
    return this.inverseTextColor
  },
  get buttonDangerBg () {
    return this.brandDanger
  },
  get buttonDangerColor () {
    return this.inverseTextColor
  },
  get buttonWarningBg () {
    return this.brandWarning
  },
  get buttonWarningColor () {
    return this.inverseTextColor
  },
  get buttonTextSize () {
    return platform === PLATFORM.IOS
      ? this.fontSizeBase * 1.1
      : this.fontSizeBase - 1
  },
  get buttonTextSizeLarge () {
    return this.fontSizeBase * 1.5
  },
  get buttonTextSizeSmall () {
    return this.fontSizeBase * 0.8
  },
  get borderRadiusLarge () {
    return this.fontSizeBase * 3.8
  },
  get iconSizeLarge () {
    return this.iconFontSize * 1.5
  },
  get iconSizeSmall () {
    return this.iconFontSize * 0.6
  }

}
