import React from "react"
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
	FlatList
} from "react-native"
import { connect } from "react-redux"
import { strings, dates } from "../../i18n"
import { CalendarList } from "react-native-calendars"
import ShadowRect from "../../components/ShadowRect"
import Row from "../../components/Row"
import UserWithPic from "../../components/UserWithPic"
import Separator from "../../components/Separator"
import { Icon } from "react-native-elements"
import { MAIN_PADDING, calendarTheme } from "../../consts"

export class ChooseDate extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: new Date().toJSON().slice(0, 10)
		}
	}
	renderArrow = direction => (
		<Icon
			name={
				direction === "left"
					? "keyboard-arrow-right"
					: "keyboard-arrow-left"
			}
			type="material"
		/>
	)
	renderItem = ({ item, index }) => (
		<Row
			style={styles.lessonRow}
			leftSide={<Text style={styles.hour}>13:00-13:40</Text>}
		>
			<UserWithPic
				name={item.title}
				nameStyle={styles.nameStyle}
				width={42}
				height={42}
			/>
		</Row>
	)
	render() {
		return (
			<View style={styles.container}>
				<CalendarList
					style={styles.calendar}
					theme={calendarTheme}
					// Enable horizontal scrolling, default = false
					horizontal={true}
					// Enable paging on horizontal, default = false
					pagingEnabled={true}
					// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
					minDate={Date()}
					markedDates={{
						[this.state.selected]: {
							selected: true,
							disableTouchEvent: true
						}
					}}
					// Handler which gets executed on day press. Default = undefined
					onDayPress={day => {
						this.setState({
							selected: day.dateString
						})
					}}
					// Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
					monthFormat={"MMMM"}
					renderArrow={this.renderArrow}
					hideArrows={false}
					// Do not show days of other months in month page.
					hideExtraDays={false}
				/>
				<View style={styles.scheduleContainer}>
					<Text testID="dateString" style={styles.scheduleTitle}>
						{dates("date.formats.short", this.state.selected)}
					</Text>
					<ShadowRect style={styles.schedule}>
						<FlatList
							ItemSeparatorComponent={() => <Separator />}
							testID="scheduleList"
							data={[
								{ title: "רועי ונונו", key: "item1" },
								{ title: "דוד אמסלם", key: "item2" }
							]}
							renderItem={this.renderItem}
						/>
					</ShadowRect>
				</View>
				<TouchableHighlight
					underlayColor="#ffffff00"
					onPress={() => {
						this.props.navigation.navigate("NewLesson", {
							date: this.state.selected
						})
					}}
				>
					<View testID="continueButton" style={styles.floatButton}>
						<Text style={styles.buttonText}>
							{strings("teacher.new_lesson.continue")}
						</Text>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	calendar: {
		flex: 1
	},
	scheduleContainer: {
		flex: 1,
		marginTop: 20
	},
	scheduleTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "rgb(121, 121, 121)",
		alignSelf: "flex-start",
		marginLeft: MAIN_PADDING
	},
	schedule: { minHeight: 230, marginTop: 24 },
	hour: {
		marginTop: -2,
		color: "rgb(12,116,244)"
	},
	nameStyle: {
		fontSize: 18,
		marginTop: 4
	},
	lessonRow: {
		marginTop: 12
	},
	floatButton: {
		position: "absolute",
		bottom: 22,
		backgroundColor: "rgb(12,116,244)",
		width: 280,
		height: 56,
		borderRadius: 28,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "rgb(12,116,244)",
		shadowOffset: {
			width: 0,
			height: 8
		},
		shadowOpacity: 0.5,
		shadowRadius: 16,
		elevation: 8
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold"
	}
})

export default connect()(ChooseDate)
