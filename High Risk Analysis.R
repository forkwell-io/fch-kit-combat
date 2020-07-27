
##################### High Risk Analysis for Forkwell Coronavirus Hackthon #######################
#################################################################################################

################################ Install, load, and setup ########################################

# Install the relevant libraries - do this one time
install.packages("lubridate")
install.packages("ggplot2")
install.packages("data.table")
install.packages("ggrepel")
install.packages("dplyr")
install.packages("data.table")
install.packages("tidyverse")

# Load the relevant libraries - do this every time
library(lubridate)
library(ggplot2)
library(dplyr)
library(data.table)
library(ggrepel)
library(tidyverse)

################################ Potential Viral Hotspots ###########################################

# Load all the citizen's data and ID of positive cases from the clound 
citizen_data <- read.csv("Citizen_data.csv", fileEncoding="UTF-8-BOM")
Positive_case <- read.csv("Positive_case.csv", fileEncoding="UTF-8-BOM")

# Define empty matrix for positive case data
Positive_case_data <- c()

# Extract the latitude (4th column) and longitude (5th column) data of positive case
for (i in 1:nrow(Positive_case)){
  for (j in 1:nrow(citizen_data)){
    if(citizen_data$ID[c(j)] == Positive_case$ID[c(i)]){
      temp_data <- citizen_data[c(j),c(1, 4,5)]
      Positive_case_data <- rbind(Positive_case_data,temp_data)
    }
  }
}

# Display the all the location pass through by each positive case
plot(Positive_case_data$Latitude,Positive_case_data$Longitude,type = "p")

# Define empty matrix for total overlap location
total_overlap_location <- c()

# Extract the overlap latitude and longitude for between each positive case
# if the average difference magnitude less than 0.0005 indicated the potential overlap lcoation
for(i in 1:nrow(Positive_case_data)){
  for(j in 1:nrow(Positive_case_data)){
    if(Positive_case_data$ID[j]!= Positive_case_data$ID[i]){
      diff_magnitude <- Positive_case_data[c(j),c(2,3)]- Positive_case_data[c(i),c(2,3)]
      average_diff_magnitude <- sum(diff_magnitude)/2
        if(abs(average_diff_magnitude) <  0.0005)       
          overlap_location <- Positive_case_data[c(j),c(2,3)]
          total_overlap_location <- rbind(total_overlap_location,overlap_location)
    }
  }
}

# Filtering out the repetative latitude and longitude
for (i in 1:nrow(total_overlap_location)) {
  for (j in 1:nrow(total_overlap_location)){
    if(total_overlap_location[c(i),c(1)] == total_overlap_location[c(i+1),c(1)] && 
       total_overlap_location[c(i),c(2)] == total_overlap_location[c(i+1),c(2)]) {
        total_overlap_location <- total_overlap_location[-c(i+1),]
    }
  }
}

overlap_location <-total_overlap_location

# Export the viral hotspots coordinates as .csv file
write.csv(overlap_location,"Coordinates.csv")

# Separate into latitude and longitude
latitude_list <- subset(overlap_location, select = -c(Longitude))
longitude_list <-  subset(overlap_location, select = -c(Latitude))

# Determine the centre of the location
avg_latitude <- mean(latitude_list$Latitude)
avg_longitude <- mean(longitude_list$Longitude)

################################### Plot Viral Hotspots Heatmap ##########################################

#Get the latest Install
if(!requireNamespace("devtools")) install.packages("devtools")
devtools::install_github("dkahle/ggmap", ref = "tidyup", force=TRUE)

#Load the library
library(ggmap)

# D. Kahle and H. Wickham. ggmap: Spatial Visualization with ggplot2. The R Journal, 5(1), 144-161.URL http://journal.r-project.org/archive/2013-1/kahle-wickham.pdf

#Set your API Key
ggmap::register_google(key = "Setup your API key")
# Plot the heatmap
p <- ggmap(get_googlemap(center = c(lon = avg_longitude, lat = avg_latitude),
                         zoom = 11, scale = 2,
                         maptype ='terrain',
                         color = 'color'))
p + geom_point(aes(x = longitude_list, y = latitude_list,  colour = Initial.Type.Group), data = i2, size = 0.5) + 

#################################### Potential High Risk People ###########################################

# Define empty matrix for positive case data
remaining_case_data <- c()

# Extract the latitude and longitude data of positive case
remaining_citizen_data <- subset(citizen_data,citizen_data$ID!=Positive_case$ID[1] & citizen_data$ID!=Positive_case$ID[2])
remaining_citizen_data <- subset(remaining_citizen_data, select = -c(Date, Time))

# Define empty matrix for high risk ID
total_high_risk_ID <- c()

# Extract the high risk ID which pass through the viral hotspot
# if the average difference magnitude less than 0.0005 indicated the high risk people
for(i in 1:nrow(remaining_citizen_data)){
  for(j in 1:nrow(overlap_location)){
      diff_magnitude <- remaining_citizen_data[c(i),c(2,3)] - overlap_location[c(i),c(1,2)]
      average_diff_magnitude <- sum(diff_magnitude)/2
      if(abs(average_diff_magnitude) <  0.0005)       
        high_risk_ID <- remaining_citizen_data[c(i),c(1)]
        total_high_risk_ID <- rbind(total_high_risk_ID,high_risk_ID)
    }
}

# Filtering out the repetative high risk ID
for (i in 1:nrow(total_high_risk_ID)) {
  for (j in 1:nrow(total_high_risk_ID)){
    if(total_high_risk_ID[c(i),c(1)] == total_high_risk_ID[c(i+1),c(1)]) {
      total_high_risk_ID <- total_high_risk_ID[-c(i+1),]
    }
  }
}
high_risk_ID <- total_high_risk_ID

# Display the high risk people ID
View(high_risk_ID)

# Export the high risk ID as .csv file
write.csv(high_risk_ID,"High Risk ID.csv")

#########################################################################################################
